import axios from "axios";

export const fetchCompanies = async (token, setLoading) => {
    const url = `${import.meta.env.VITE_API_SERVER}/companys?limit=1000`;
    setLoading(true);
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.results || [];
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw new Error('Failed to fetch companies. Please try again.');
    } finally {
      setLoading(false);
    }
  };