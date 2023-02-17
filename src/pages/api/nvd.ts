const fetch = require("cross-fetch");
const moment = require("moment");

//
// gets the MOST critical vulnerabilities reported in the NVD within the last week.
//

const getLatestCriticalVulns = async (yesterday: string, lastWeek: string) => {
  let res = await fetch(
    `https://services.nvd.nist.gov/rest/json/cves/2.0?cvssV3Severity=CRITICAL&pubStartDate=${lastWeek}&pubEndDate=${yesterday}`,
    {
      method: "GET",
      headers: {
        apiKey: process.env.NVD_API_KEY,
      },
    }
  );

  const nvdData = await res.json();

  return nvdData;
};

const handler = async (req, res) => {
  try {
    const lastWeekDay = moment().subtract(7, "days").toISOString();
    const recentDay = moment().subtract(1, "days").toISOString();

    let data = await getLatestCriticalVulns(recentDay, lastWeekDay);

    res.status(200).json({ message: "Success", data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
