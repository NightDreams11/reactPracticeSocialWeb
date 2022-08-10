import React from "react"
import { Textarea } from "../../common/FormsControls/FormsControls"
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators.tsx"
import { Field, reduxForm } from "redux-form"

const maxLenght = maxLengthCreator(50)

const AddMesssageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          validate={[required, maxLenght]}
          name={"newMessageBody"}
          placeholder={"Enter your message"}
        ></Field>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

export default reduxForm({ form: "dialogAddMesssageForm" })(AddMesssageForm)
