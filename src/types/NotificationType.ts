export enum SlideNotificationType {
  'ERROR',
  'SUCCESS',
  'SERVICE',
}

export type ID = string;

export type SlideNotificationItem = {
  id: ID;
  message: string;
  type: SlideNotificationType;
};

export type NewSlideNotification = Omit<SlideNotificationItem, 'id'>;
