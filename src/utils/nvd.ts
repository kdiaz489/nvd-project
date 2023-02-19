//
// gets the MOST critical vulnerabilities reported in the NVD within pubStartDate and pubEndDate.
//
export const getLatestCriticalVulns = async (
  key: string,
  yesterday: string,
  lastWeek: string
) => {
  let res = await fetch(
    `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&pubStartDate=${lastWeek}&pubEndDate=${yesterday}`,
    {
      method: "GET",
      headers: {
        apiKey: key,
      },
    }
  );

  const nvdData = await res.json();

  return nvdData;
};

//
// get a vulnerability reported in the NVD with an id.
//
export const getVulnWithId = async (key: string, id: string) => {
  let res = await fetch(
    `https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${id}`,
    {
      method: "GET",
      headers: {
        apiKey: key,
      },
    }
  );

  const nvdData = await res.json();

  return nvdData;
};
