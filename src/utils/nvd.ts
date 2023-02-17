//
// gets the MOST critical vulnerabilities reported in the NVD within the last week.
//

export const getLatestCriticalVulns = async (
  yesterday: string,
  lastWeek: string
) => {
  let res = await fetch(
    `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&pubStartDate=${lastWeek}&pubEndDate=${yesterday}`,
    {
      method: "GET",
      headers: {
        apiKey: "bd849d4d-1d42-4898-a32c-039961ea1d4c",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const nvdData = await res.json();

  return nvdData;
};
