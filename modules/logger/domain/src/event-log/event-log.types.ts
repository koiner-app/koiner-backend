export interface CreateEventLogProps {
  eventName: string;
  data?: Record<string, any>;
  itemId: string;
  itemType: string;
  timestamp?: number;
}

export interface EventLogProps extends CreateEventLogProps {
  timestamp: number;
  count: number;
}
