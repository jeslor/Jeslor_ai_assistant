export const cleanAIJsonResponse = (rawText: any) => {
  return rawText
    .replace(/^```json\s*/i, "") // Remove ```json with optional whitespace
    .replace(/^```\s*/i, "") // Or just ```
    .replace(/\s*```$/, "") // Remove ending ```
    .trim(); // Trim whitespace
};
