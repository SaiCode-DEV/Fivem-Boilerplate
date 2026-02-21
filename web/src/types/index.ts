// Shared types for NUI communication

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NuiMessage<T = any> {
  action: string;
  data: T;
}

export interface NuiCallbackResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface SetVisibleData {
  visible: boolean;
  page?: string;
}

export const NuiActions = {
  SET_VISIBLE: 'setVisible',
  UPDATE_DATA: 'updateData',
};
