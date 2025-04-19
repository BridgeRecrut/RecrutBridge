// frontend/src/services/jobService.js

export const fetchJobs = async (keyword = '', location = '') => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/jobs?keyword=${keyword}&location=${location}`
      );
      const data = await response.json();
      return data.jobs;
    } catch (error) {
      console.error("Erreur lors de la récupération des offres :", error);
      return [];
    }
  };
  