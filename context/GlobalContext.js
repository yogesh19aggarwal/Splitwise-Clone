import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUser } from '../services/getApi';

const GroupContext = createContext();

export const useGroupContext = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  return (
    <GroupContext.Provider value={{ groups, setGroups, user, setUser, error, loading, setError }}>
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext; 