import { getErrorMessage } from './getErrorMessage';

export default async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }
  return await response.json();
}
