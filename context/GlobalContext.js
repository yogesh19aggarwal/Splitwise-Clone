import React, { createContext, useState, useContext, useEffect } from 'react';
import { getNotifications, getLanguage, getUser } from '../services/getApi';

const GroupContext = createContext();

export const useGroupContext = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notiError, setNotiError] = useState(null);
  const [lang, setLang] = useState("en");
  const [langData, setLangData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUser(res.user);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    const getNotificationFromAPI = async () => {
      setNotiError(null);
      try {
        const res = await getNotifications();
        setNotifications(res.notifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setNotiError(err.message || 'Failed to load activities');
      }
    }
    fetchUser();
    getNotificationFromAPI();
  }, []);

  useEffect(() => {
    const fetchLang = async () => {
      try {
        const res = await getLanguage(lang);
        setLangData(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLang();
  }, [lang]);

  return (
    <GroupContext.Provider value={{ groups, setGroups, user, setUser, error, loading, setError, setLang, notiError, notifications, langData, lang }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext; 