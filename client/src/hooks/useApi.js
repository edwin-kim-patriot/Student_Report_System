// client/src/hooks/useApi.js
import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useApi = (initialUrl = '', initialData = null, options = {}) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  const fetchData = useCallback(async (overrideUrl) => {
    const fetchUrl = overrideUrl || url;
    if (!fetchUrl) return;

    try {
      setLoading(true);
      setError(null);
      const response = await api.get(fetchUrl, options);
      setData(response.data);
    } catch (err) {
      setError(err.message || 'API request failed');
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [fetchData, shouldFetch]);

  const refetch = (newUrl = null) => {
    if (newUrl) setUrl(newUrl);
    setShouldFetch(true);
  };

  return {
    data,
    loading,
    error,
    setUrl,
    refetch,
    setData,
    setError,
  };
};
