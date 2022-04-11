import { useLocalStorage } from "@hooks/useLocalStorage";
import { FIVE_MINUTES } from "constants/app.constants";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useReport = (reportName: string) => {
  const { t } = useTranslation();
  const [reports, setReports] = useLocalStorage(`${reportName}-reports`, {});

  const findReportRecord = (reportTargetId: string, userReportId: string) => {
    const reportsOfId = reports[reportTargetId] || [];
    return reportsOfId.find((report: any) => report.userId === userReportId);
  };

  const updateLastTimeReported = (
    reportTargetId: string,
    userReportId: string
  ) => {
    const currentReports = reports[reportTargetId] || [];
    let newReports = [...currentReports];

    if (currentReports?.length === 0) {
      newReports.push({
        userId: userReportId,
        reportTime: new Date().toISOString(),
      });
    } else {
      newReports = newReports.map((report) => {
        if (report.userId === userReportId) {
          return {
            ...report,
            reportTime: new Date().toISOString(),
          };
        }

        return report;
      });
    }
    reports[reportTargetId] = newReports;
    setReports(reports);
  };

  const onReport = (
    reportTargetId: string,
    userReportId: string,
    callback: any
  ) => {
    const reportRecord = findReportRecord(reportTargetId, userReportId);

    if (reportRecord) {
      const lastTimeReported = reportRecord.reportTime;

      if (+Date.now() - new Date(lastTimeReported).getTime() < FIVE_MINUTES) {
        toast.error(
          t("reportRestriction", {
            label: t(`${reportName}`),
          })
        );
        return;
      }
    }
    callback();
    updateLastTimeReported(reportTargetId, userReportId);
  };

  return {
    onReport,
  };
};
