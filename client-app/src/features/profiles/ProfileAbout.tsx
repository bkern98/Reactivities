import { Button, Grid, Header, Tab } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'
import { useState } from 'react'
import ProfileEditForm from './ProfileEditForm'
import { observer } from 'mobx-react-lite'

export default observer(function ProfileAbout() {
  const {
    profileStore: { isCurrentUser, profile },
  } = useStore()
  const [editProfileMode, setEditProfileMode] = useState(false)

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editProfileMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditProfileMode(!editProfileMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editProfileMode ? (
            <ProfileEditForm setEditMode={setEditProfileMode} />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  )
})
