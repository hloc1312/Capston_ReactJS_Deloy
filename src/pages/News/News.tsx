import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
const News = () => {
  const { t, i18n } = useTranslation();
  return <div>{t("báo chí")}</div>;
};

export default News;
