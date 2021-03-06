<template>
  <div
    :id="id"
    :class="[{ 'maz-is-dark': dark }, size]"
    class="maz-base-component maz-phone-number-input maz-flex"
  >
    <button
      v-if="countryCode && !noFlags"
      class="maz-phone-number-input__country-flag"
      tabindex="-1"
      @click="focusCountrySelector"
    >
      <div :class="`maz-flag maz-flag-${countryCode.toLowerCase()}`" />
    </button>
    <MazSelect
      v-if="!noCountrySelector"
      ref="CountrySelector"
      v-model="countryCode"
      :options="countriesSorted"
      :placeholder="t.countrySelectorLabel"
      search
      :search-placeholder="t.countrySelectorSearchPlaceholder"
      :items-height="countriesHeight"
      :error="shouldChooseCountry"
      :hint="shouldChooseCountry ? t.countrySelectorError : null"
      :size="size"
      :success="isValid && !noValidation"
      :disabled="disabled"
      :input-value="callingCode"
      :list-width="250"
      :config="{
        labelKey: 'dialCode',
        searchKey: 'name',
        valueKey: 'iso2'
      }"
      :color="color"
      class="country-selector"
      :class="{
        'no-padding-left': noFlags || !countryCode
      }"
    >
      <template v-slot="{ option }">
        <div
          class="maz-flex maz-align-center"
        >
          <div
            v-if="!noFlags"
            class="country-selector__flag-container maz-mr-2"
          >
            <div :class="`maz-flag maz-flag-${option.iso2.toLowerCase()}`" />
          </div>
          <span
            v-if="showCodeOnList"
            class="country-selector__calling-code maz-flex-fixed maz-text-muted"
            :class="{
              'maz-text-muted-dark': option.isSelected
            }"
          >
            +{{ option.dialCode }}
          </span>
          <div
            class="maz-dots-text maz-flex-1 maz-text-left maz-text-color"
            :class="{
              'maz-text-white': option.isSelected
            }"
          >
            {{ option.name }}
          </div>
        </div>
      </template>
    </MazSelect>

    <div class="maz-flex-1">
      <MazInput
        :id="`${uniqueId}_phone_number`"
        ref="PhoneNumberInput"
        v-model="inputValue"
        :placeholder="t.phoneNumberLabel"
        :hint="hintValue"
        :disabled="disabled"
        :size="size"
        :success="isValid && !noValidation"
        v-bind="$attrs"
        clearable
        :color="color"
        class="input-phone-number"
        :class="{
          'has-border-radius': noCountrySelector
        }"
        @keydown="(e) => { lastKeyPressed = e.keyCode }"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
        @change="$emit('change', $event)"
        @clear="$emit('clear', $event)"
      >
        <!-- Custom left icon -->
        <slot
          slot="icon-left"
          name="icon-left"
        />
        <!-- Custom right icon -->
        <slot
          slot="icon-right"
          name="icon-right"
        />
      </MazInput>
    </div>
  </div>
</template>
<script>
import { countries, countriesIso } from './constantes/js/phoneCodeCountries.js'
import examples from 'libphonenumber-js/examples.mobile.json'
import { parsePhoneNumberFromString, AsYouType, getExampleNumber, getCountryCallingCode } from 'libphonenumber-js'
import locales from './constantes/locales'
import MazInput from './../MazInput'
import MazSelect from './../MazSelect'

import uniqueId from './../../mixins/uniqueId'

const browserLocale = () => {
  if (typeof window === 'undefined') return null
  const browserLocale = window.navigator.userLanguage || window.navigator.language
  let locale = browserLocale ? browserLocale.substr(3, 4).toUpperCase() : null
  if (locale === '') locale = browserLocale.substr(0, 2).toUpperCase()
  return locale
}

const isCountryAvailable = (locale) => {
  return countriesIso.includes(locale)
}

export default {
  name: 'MazPhoneNumberInput',
  components: {
    // CountrySelector,
    MazInput,
    MazSelect
  },
  mixins: [uniqueId],
  props: {
    value: {
      validator: prop => ['string', 'number'].includes(typeof prop) || prop === null,
      default: null
    },
    id: { type: String, default: null },
    disabled: { type: Boolean, default: false },
    // set default country code (Ex: `default-country-code="FR"`)
    defaultCountryCode: { type: String, default: null },
    // Same as MazInput (options: `sm|md|lg`)
    size: { type: String, default: null },
    // Countries selected will be at the top of the list - Ex : `preferred-countries="['FR', 'BE', 'DE']`
    preferredCountries: { type: Array, default: null },
    // Only countries selected are in list - Ex : `only-countries="['FR', 'BE', 'DE']`
    onlyCountries: { type: Array, default: null },
    // Countries seleted are remove from the list - Ex : `ignored-countries="['FR', 'BE', 'DE']`
    ignoredCountries: { type: Array, default: Array },
    // Translate text in component - By default `{ countrySelectorLabel: 'Country code', countrySelectorError: 'Choose country', phoneNumberLabel: 'Phone number', example: 'Example:' }`
    translations: { type: Object, default: null },
    // Remove the validation UI state (success border color)
    noValidation: { type: Boolean, default: false },
    // Remove flags in country selector
    noFlags: { type: Boolean, default: false },
    // Remove the number example from the label input
    noExample: { type: Boolean, default: false },
    // Change the height of country item in list
    countriesHeight: { type: Number, default: 30 },
    // Disable use of browser locale to init the country selector (usefull for Nuxt.JS)
    noUseBrowserLocale: { type: Boolean, default: false },
    // Fetch country code via https://ip2c.org/s - Network needed - (Do not use it with default-country-code options)
    fetchCountry: { type: Boolean, default: false },
    // The country selector is not shown, you can validate your phone number with the country code set
    noCountrySelector: { type: Boolean, default: false },
    // Show the country phone code in the list
    showCodeOnList: { type: Boolean, default: false },
    // Enable the dark mode
    dark: { type: Boolean, default: false },
    // Use color
    color: { type: String, default: 'primary' }
  },
  data () {
    return {
      results: {},
      userLocale: this.defaultCountryCode,
      lastKeyPressed: null,
      inputValueFormatted: null
    }
  },
  computed: {
    t () {
      return {
        ...locales,
        ...this.translations
      }
    },
    codesCountries () {
      return countries
    },
    inputValue: {
      get () {
        const { results, inputValueFormatted, isValid } = this
        return results && results.formatNational && isValid ? results.formatNational : inputValueFormatted
      },
      set (phoneNumber) {
        const { countryCode, getAsYouTypeFormat, emitValues } = this
        this.inputValueFormatted = getAsYouTypeFormat({
          phoneNumber,
          countryCode
        })
        emitValues({ countryCode, phoneNumber })
      }
    },
    countryCode: {
      get () {
        return this.results.countryCode || this.userLocale
      },
      set (countryCode) {
        const { emitValues, $refs, inputValue } = this
        if (!countryCode) return
        emitValues({countryCode, phoneNumber: inputValue})
        $refs.PhoneNumberInput.$el.querySelector('input').focus()
      }
    },
    callingCode () {
      const { countryCode } = this
      return countryCode ? `+${getCountryCallingCode(countryCode)}` : null
    },
    shouldChooseCountry () {
      return !this.countryCode && !!this.inputValue
    },
    isValid () {
      return this.results.isValid
    },
    phoneNumberExample () {
      const phoneNumber = this.countryCode ? getExampleNumber(this.countryCode, examples) : null
      return phoneNumber ? phoneNumber.formatNational() : null
    },
    hasEmptyPhone () {
      return this.inputValue === '' || this.inputValue === null
    },
    hintValue () {
      const { noExample, phoneNumberExample, hasEmptyPhone, isValid, t, } = this
      return  noExample || !phoneNumberExample
        ? null
        : hasEmptyPhone || isValid ? null : `${t.example} ${phoneNumberExample}`
    },
    countriesList () {
      return this.codesCountries.filter(item => !this.ignoredCountries.includes(item.iso2))
    },
    countriesFiltered () {
      const countries = this.onlyCountries || this.preferredCountries
      return countries.map(country => this.countriesList.find(item => item.iso2.includes(country)))
    },
    otherCountries () {
      return this.countriesList.filter(item => !this.preferredCountries.includes(item.iso2))
    },
    countriesSorted () {
      return this.preferredCountries
        ? [
          ...this.countriesFiltered,
          ...this.otherCountries
        ]
        : this.onlyCountries
          ? this.countriesFiltered
          : this.countriesList
    }
  },
  watch: {
    defaultCountryCode (newValue, oldValue) {
      if (newValue === oldValue) return
      this.setLocale(newValue)
    }
  },
  async mounted () {
    try {
      const { defaultCountryCode, fetchCountry, noUseBrowserLocale, fetchCountryCode, setLocale, value } = this
      if (value) this.inputValue = value

      if (defaultCountryCode && fetchCountry)
        throw new Error('MazPhoneNumberInput: Do not use \'fetch-country\' and \'default-country-code\' options in the same time')
      if (defaultCountryCode && noUseBrowserLocale)
        throw new Error('MazPhoneNumberInput: If you use a \'default-country-code\', do not use \'no-use-browser-locale\' options')
      if (defaultCountryCode) return

      fetchCountry
        ? fetchCountryCode()
        : !noUseBrowserLocale
          ? setLocale(browserLocale())
          : null
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {
    async focusCountrySelector () {
      await this.$nextTick()
      this.$refs.CountrySelector.$el.querySelector('input').focus()
    },
    getAsYouTypeFormat (payload) {
      const { countryCode, phoneNumber } = payload
      const asYouType = new AsYouType(countryCode)
      const formatted = phoneNumber ? asYouType.input(phoneNumber) : null
      return formatted
    },
    getParsePhoneNumberFromString ({ phoneNumber, countryCode }) {
      const parsing = phoneNumber ? parsePhoneNumberFromString(phoneNumber, countryCode) : null
      return {
        countryCode,
        isValid: false,
        ...(phoneNumber && (phoneNumber !== '')
          ? { phoneNumber : phoneNumber }
          : null
        ),
        ...(parsing
          ? {
            countryCode: parsing.country || countryCode,
            countryCallingCode: parsing.countryCallingCode,
            formattedNumber: parsing.number,
            nationalNumber: parsing.nationalNumber,
            isValid: parsing.isValid(),
            type: parsing.getType(),
            formatInternational: parsing.formatInternational(),
            formatNational: parsing.formatNational(),
            uri: parsing.getURI(),
            e164: parsing.format('E.164')
          }
          : null
        )
      }
    },
    async emitValues (payload) {
      const { inputValue, lastKeyPressed, getParsePhoneNumberFromString } = this

      const backSpacePressed = lastKeyPressed === 8

      await this.$nextTick()
      const lastCharacOfPhoneNumber = inputValue ? inputValue.trim().slice(-1) : false
      if (backSpacePressed && lastCharacOfPhoneNumber && (lastCharacOfPhoneNumber.slice(-1) === ')')) {
        return this.inputValue = inputValue.slice(0, -2)
      }

      this.results = getParsePhoneNumberFromString(payload)
      // sent when the user tape
      // @arg Object with all paser values
      this.$emit('update', this.results)
      // sent when the user tape
      // @arg Phone number value formatted in e164 format (international format)
      this.$emit('input', this.results.e164)
    },
    setLocale (locale) {
      const { emitValues, inputValue } = this
      const countryAvailable = isCountryAvailable(locale)
      if (countryAvailable && locale) {
        this.userLocale = countryAvailable ? locale : null
        if (inputValue) emitValues({countryCode: this.userLocale, phoneNumber: inputValue})
      } else if (!countryAvailable && locale) {
        // If default country code is not available
        console.warn(`The locale ${locale} is not available`)
      }
    },
    async fetchCountryCode () {
      try {
        const response  = await fetch('https://ip2c.org/s')
        const responseText = await response.text()
        const result = (responseText || '').toString()
        if (result && result[0] === '1') this.setLocale(result.substr(2, 2))
      } catch (err) {
        return new Error('[MazPhoneNumberInput] Error while fetching country code')
      }
    }
  }
}
</script>

