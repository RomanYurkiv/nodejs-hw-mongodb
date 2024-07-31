const parseContactType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return;
    const validTypes = ['work', 'personal', 'home'];
    
    if (validTypes.includes(type)) return type;
  };
  
  const parseBoolean = (value) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return;
  };
  
  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;
  
    const parsedType = parseContactType(type);
    const parsedIsFavourite = parseBoolean(isFavourite);
  
    return {
      ...(parsedType && { contactType: parsedType }),
      ...(typeof parsedIsFavourite === 'boolean' && { isFavourite: parsedIsFavourite }),
    };
  };