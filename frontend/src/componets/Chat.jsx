/* eslint-disable */
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Channels from './Channels';
import Messages from './Messages';
import { useGetChanelsQuery, useGetmessagesQuery } from '../slices/api/chatApi';
import Spiner from './Spiner';

const Chat = () => {
  const { t } = useTranslation();

  const {
    isLoading: isChannelsLoading,
    isError: isChannelsError,
    error: channelsError,
  } = useGetChanelsQuery();

  const {
    isLoading: isMessagesLoading,
    isError: isMessagesError,
    error: messagesError,
  } = useGetmessagesQuery();

  const isLoading = isChannelsLoading || isMessagesLoading;

  useEffect(() => {
    const hasNetworkError =
      (isChannelsError && channelsError?.status === 'FETCH_ERROR') ||
      (isMessagesError && messagesError?.status === 'FETCH_ERROR');

    if (hasNetworkError) {
      toast.error(t('errors.network'));
    }
  }, [isChannelsError, isMessagesError, channelsError, messagesError, t]);

  const renderContent = () => {
    if (isLoading) {
      return <Spiner />;
    }

    return (
      <div className="d-flex flex-column h-100">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <Channels />
            <Messages />
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default Chat;
