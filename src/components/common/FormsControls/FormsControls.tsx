import React from "react"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import { FieldValidatorType } from "../../../utils/validators/validators"
import styles from "./FormsControls.module.css"

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
  children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  // const { input, meta, child, ...restProps } = props
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  // const { input, meta, child, ...restProps } = props
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps}></input>
    </FormControl>
  )
}

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      ></Field>
      {text}
    </div>
  )
}
