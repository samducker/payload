'use client'
import type { DateFieldClientComponent, DateFieldValidation } from 'payload'

import { TZDateMini as TZDate } from '@date-fns/tz/date/mini'
import { getTranslation } from '@payloadcms/translations'
import { transpose } from 'date-fns'
import { useCallback, useMemo } from 'react'

import { DatePickerField } from '../../elements/DatePicker/index.js'
import { RenderCustomComponent } from '../../elements/RenderCustomComponent/index.js'
import { TimezonePicker } from '../../elements/TimezonePicker/index.js'
import { FieldDescription } from '../../fields/FieldDescription/index.js'
import { FieldError } from '../../fields/FieldError/index.js'
import { FieldLabel } from '../../fields/FieldLabel/index.js'
import { useForm, useFormFields } from '../../forms/Form/context.js'
import { useField } from '../../forms/useField/index.js'
import './index.scss'
import { withCondition } from '../../forms/withCondition/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { mergeFieldStyles } from '../mergeFieldStyles.js'
import { fieldBaseClass } from '../shared/index.js'

const baseClass = 'date-time-field'

const DateTimeFieldComponent: DateFieldClientComponent = (props) => {
  const {
    field,
    field: {
      admin: { className, date: datePickerProps, description, placeholder } = {},
      label,
      localized,
      required,
      timezone,
    },
    path,
    readOnly,
    siblingField,
    validate,
  } = props

  // Get the user timezone so we can adjust the displayed value against it
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const { i18n } = useTranslation()
  const { dispatchFields, setModified } = useForm()

  const memoizedValidate: DateFieldValidation = useCallback(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, required })
      }
    },
    [validate, required],
  )

  const {
    customComponents: { AfterInput, BeforeInput, Description, Error, Label } = {},
    setValue,
    showError,
    value,
  } = useField<Date>({
    path,
    validate: memoizedValidate,
  })

  const timezonePath = path + '_timezone'
  const timezoneField = useFormFields(([fields, _]) => fields?.[timezonePath])
  const timezoneOptions = 'options' in siblingField ? siblingField?.options : null

  const selectedTimezone = timezoneField?.value as string

  // The displayed value should be the original value, adjusted to the user's timezone
  const displayedValue = useMemo(() => {
    if (timezone && selectedTimezone && userTimezone && value) {
      // Create TZDate instances for the selected timezone and the user's timezone
      // These instances allow us to transpose the date between timezones while keeping the same time value
      const DateWithOriginalTz = TZDate.tz(selectedTimezone)
      const DateWithUserTz = TZDate.tz(userTimezone)

      const modifiedDate = new TZDate(value).withTimeZone(selectedTimezone)

      // Transpose the date to the selected timezone
      const dateWithTimezone = transpose(modifiedDate, DateWithOriginalTz)

      // Transpose the date to the user's timezone - this is necessary because the react-datepicker component insists on displaying the date in the user's timezone
      const dateWithUserTimezone = transpose(dateWithTimezone, DateWithUserTz)

      return dateWithUserTimezone.toISOString()
    }

    return value
  }, [timezone, selectedTimezone, value, userTimezone])

  const styles = useMemo(() => mergeFieldStyles(field), [field])

  const onChange = useCallback(
    (incomingDate: Date) => {
      if (!readOnly) {
        if (timezone && selectedTimezone && incomingDate) {
          const tzDateWithUTC = TZDate.tz(selectedTimezone)
          const dateToUserTz = new TZDate(incomingDate)

          const dateWithTimezone = transpose(dateToUserTz, tzDateWithUTC)

          setValue(dateWithTimezone.toISOString() || null)
        } else {
          setValue(incomingDate?.toISOString() || null)
        }
      }
    },
    [readOnly, setValue, timezone, selectedTimezone],
  )

  const onChangeTimezone = useCallback(
    (timezone: string) => {
      if (timezone && timezonePath) {
        dispatchFields({
          type: 'UPDATE',
          path: timezonePath,
          value: timezone,
        })

        setModified(true)
      }
    },
    [dispatchFields, setModified, timezonePath],
  )

  return (
    <div
      className={[
        fieldBaseClass,
        baseClass,
        className,
        showError && `${baseClass}--has-error`,
        readOnly && 'read-only',
      ]
        .filter(Boolean)
        .join(' ')}
      style={styles}
    >
      <RenderCustomComponent
        CustomComponent={Label}
        Fallback={<FieldLabel label={label} localized={localized} required={required} />}
      />
      <div className={`${fieldBaseClass}__wrap`} id={`field-${path.replace(/\./g, '__')}`}>
        <RenderCustomComponent
          CustomComponent={Error}
          Fallback={<FieldError path={path} showError={showError} />}
        />
        {BeforeInput}
        <DatePickerField
          {...datePickerProps}
          onChange={onChange}
          overrides={{
            ...datePickerProps?.overrides,
          }}
          placeholder={getTranslation(placeholder, i18n)}
          readOnly={readOnly}
          value={displayedValue}
        />
        {timezone && timezoneOptions.length > 0 && (
          <TimezonePicker
            id={`${path}-timezone-picker`}
            onChange={onChangeTimezone}
            options={timezoneOptions}
            selectedTimezone={selectedTimezone}
          />
        )}

        {AfterInput}
      </div>
      <RenderCustomComponent
        CustomComponent={Description}
        Fallback={<FieldDescription description={description} path={path} />}
      />
    </div>
  )
}

export const DateTimeField = withCondition(DateTimeFieldComponent)
