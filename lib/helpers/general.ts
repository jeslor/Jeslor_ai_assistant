export const refactorCompany = (company: string) => {
  const parts = company.replace(/^https?:\/\//, "");
  return parts.split("/")[0];
};
