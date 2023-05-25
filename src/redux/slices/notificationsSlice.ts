import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ID, NewSlideNotification, SlideNotificationItem } from '../../types/NotificationType';
import { v4 as uuidv4 } from 'uuid';

type InitialState = {
  notifications: SlideNotificationItem[];
};

const initialState: InitialState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NewSlideNotification>) {
      const { message, type } = action.payload;
      state.notifications.push({
        id: uuidv4(),
        message,
        type,
      });
    },
    removeNotification(state, action: PayloadAction<ID>) {
      const idToRemove = action.payload;
      const notificationIndex: number = state.notifications.findIndex(
        (notification) => notification.id === idToRemove
      );

      if (notificationIndex !== -1) {
        state.notifications.splice(notificationIndex, 1);
      }
    },
    clearNotification(state) {
      state.notifications = initialState.notifications;
    },
  },
});

export const { addNotification, removeNotification, clearNotification } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
