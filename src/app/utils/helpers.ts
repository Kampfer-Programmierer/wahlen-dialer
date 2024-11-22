export const setCookie = (param: string, obj: string) => {
    // Set project in cookie when a project is clicked
    const cookieValue = obj;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1); // Cookie expires in 7 days
    document.cookie = `${param}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; secure; SameSite=lax`;
  };