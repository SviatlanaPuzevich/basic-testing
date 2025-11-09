import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mock data' });
    const mockCreate = jest.fn(() => ({ get: mockGet }));
    (axios.create as jest.Mock).mockImplementation(mockCreate);

    jest.runAllTimers();
    await throttledGetDataFromApi('/fake_url');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mock data' });
    const mockCreate = jest.fn(() => ({ get: mockGet }));
    (axios.create as jest.Mock).mockImplementation(mockCreate);

    jest.runAllTimers();
    await throttledGetDataFromApi('/provided/url');

    expect(mockGet).toHaveBeenCalledWith('/provided/url');
  });

  test('should return response data', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'mock data' });
    const mockCreate = jest.fn(() => ({ get: mockGet }));

    (axios.create as jest.Mock).mockImplementation(mockCreate);

    jest.runAllTimers();
    const data = await throttledGetDataFromApi('/provided/url');

    expect(data).toEqual('mock data');
  });
});
