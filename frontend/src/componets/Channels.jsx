import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'
import { setCurrentChannelId, openModal } from '../slices/uiSlice'
import { useGetChanelsQuery } from '../slices/api/chatApi'
import { useTranslation } from 'react-i18next'

const Channels = () => {
  const { t } = useTranslation()
  const { data: channels = [] } = useGetChanelsQuery()
  const dispatch = useDispatch()
  const currentChannelId = useSelector((state) => state.ui.currentChannelId)

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <Button
          variant="flush"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => dispatch(openModal({ type: 'adding' }))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => {
          const variant = channel.id === currentChannelId ? 'secondary' : 'light'

          return (
            <li key={channel.id} className="nav-item w-100">
              {channel.removable ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    variant={variant}
                    className="w-100 rounded-0 text-start text-truncate"
                    onClick={() => dispatch(setCurrentChannelId(channel.id))}
                  >
                    <span className="me-1">#</span> {channel.name}
                  </Button>

                  <Dropdown.Toggle split variant={variant} className="flex-grow-0">
                    <span className="visually-hidden">{t('chat.channelManagement')}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => dispatch(openModal({ type: 'removing', extraData: channel }))}
                    >
                      {t('modals.delete')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => dispatch(openModal({ type: 'renaming', extraData: channel }))}
                    >
                      {t('modals.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant={variant}
                  className="w-100 rounded-0 text-start"
                  onClick={() => dispatch(setCurrentChannelId(channel.id))}
                >
                  <span className="me-1">#</span> {channel.name}
                </Button>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Channels
