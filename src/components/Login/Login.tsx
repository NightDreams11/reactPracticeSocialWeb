import { connect } from "react-redux"
import { InjectedFormProps, reduxForm } from "redux-form"
import { required } from "../../utils/validators/validators"
import { createField, Input } from "../common/FormsControls/FormsControls"
import { login } from "../../redux/auth-reducer"
import { Redirect } from "react-router-dom"
import style from "../common/FormsControls/FormsControls.module.css"
import React from "react"
import { AppStateType } from "../../redux/redux-store"

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <>
        {/* <div> */}
        {/* <Field placeholder={"Email"} name={"email"} component={Input} validate={[required]}></Field> */}
        {/* </div> */}
        {createField<LoginFormValuesTypeKeys>(
          "Email",
          "email",
          [required],
          Input
        )}
        {createField<LoginFormValuesTypeKeys>(
          "Password",
          "password",
          [required],
          Input,
          {
            type: "password",
          }
        )}
        {createField<LoginFormValuesTypeKeys>(
          undefined,
          "rememberMe",
          [],
          Input,
          { type: "checkbox" },
          "remember me"
        )}

        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl &&
          createField<LoginFormValuesTypeKeys>(
            "Symbols from image",
            "captcha",
            [required],
            Input,
            {}
          )}

        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
          <button>Login</button>
        </div>
      </>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm)

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
}
type MapDispatchPropsType = {
  login: (
    email: string,
    password: number,
    rememberMe: boolean,
    captcha: string | null
  ) => void
}
type OwnPropsType = {}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

export type LoginFormValuesType = {
  email: string
  password: number
  rememberMe: boolean
  captcha: string | null
}

// Мы говорим, что хотим получить из LoginFormValuesType только строковые значения (второй параметр).
// Т.е. левая часть (LoginFormValuesType) может состоять из разных сущностей,
// но мы хотим взять только строки (string - второй параметр)
type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>
const Login: React.FC<PropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  if (props.isAuth) {
    return <Redirect to={"/profile"}></Redirect>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm
        onSubmit={onSubmit}
        captchaUrl={props.captchaUrl}
      ></LoginReduxForm>
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, { login })(Login)
