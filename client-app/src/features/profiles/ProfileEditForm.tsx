import { Form, Formik } from 'formik'
import { Button } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import MyTextArea from '../../app/common/form/MyTextArea'
import * as Yup from 'yup'
import { useStore } from '../../app/stores/store'
import { observer } from 'mobx-react-lite'

interface Props {
  setEditMode: (editMode: boolean) => void
}

export default observer(function ProfileEditForm({ setEditMode }: Props) {
  const {
    profileStore: { profile, updateProfile },
  } = useStore()
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
  })

  return (
    <Formik
      enableReinitialize
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      validationSchema={validationSchema}
      onSubmit={values => {
        updateProfile(values).then(() => setEditMode(false))
      }}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Form className='ui form'>
          <MyTextInput name='displayName' placeholder='Display Name' />
          <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
          <Button
            disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting}
            floated='right'
            positive
            type='submit'
            content='Update profile'
          />
        </Form>
      )}
    </Formik>
  )
})
