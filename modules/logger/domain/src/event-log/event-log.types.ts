export interface CreateEventLogProps {
  eventName: string;
  data?: string;
  itemId: string;
  itemType: string;
  timestamp?: number;
}

export interface EventLogProps extends CreateEventLogProps {
  timestamp: number;
}
