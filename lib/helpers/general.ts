export const refactorCompany = (company: string) => {
  console.log("Company:", company);

  const parts = company.replace(/^https?:\/\//, "");
  return parts.split("/")[0];
};
