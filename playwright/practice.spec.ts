import { test, expect } from "@playwright/test";

test("Application should have correct initial state", async ({ page }) => {
  await page.goto("");
  expect(await page.getByRole("main").getByRole("link").all()).toHaveLength(22);
  await expect(page.getByRole("main").getByRole("heading").first()).toHaveText(
    /Welcome/,
  );

  await expect(page.locator(".text-lg").first()).toHaveText(
    "🧪 Practice Exams Platform",
  );
  await expect(page.locator(".text-lg").last()).toHaveText(
    "Select an exam from the list bellow.",
  );

  const examHeaders = [
    "AWS Certified ANS-C01",
    "AWS Certified CLF-C02",
    "AWS Certified DAS-C01",
    "AWS Certified DBS-C01",
    "AWS Certified DVA-C02",
    "AWS Certified MLS-C01",
    "AWS Certified SAA-C03",
    "AWS Certified SCS-C02",
    "GCP ACE",
    "ITIL 4 Foundation",
    "Microsoft Azure AZ-104",
    "Microsoft Azure AZ-204",
    "Microsoft Azure AZ-305",
    "Microsoft Azure AZ-400",
    "Microsoft Azure AZ-500",
    "Microsoft Azure AZ-800",
    "Microsoft Azure AZ-900",
    "Microsoft Azure SC-900",
    "PSD I",
    "PSM I",
    "PSM II",
    "PSPO I",
  ];

  const examParagraphs = [
    "AWS Certified Advanced Networking Specialty",
    "AWS Certified Cloud Practitioner",
    "AWS Certified Data Analytics Specialty",
    "AWS Certified Database Specialty",
    "AWS Certified Developer Associate",
    "AWS Certified Machine Learning Specialty",
    "AWS Certified Solutions Architect Associate",
    "AWS Certified Security Specialty",
    "GCP Associate Cloud Engineer",
    "IT Service Management",
    "Microsoft Azure Administrator",
    "Developing Solutions for Azure",
    "Designing Microsoft Azure Infrastructure Solutions",
    "Designing and Implementing Microsoft DevOps Solutions",
    "Azure Security Engineer",
    "Windows Server Hybrid Administrator",
    "Microsoft Azure Fundamentals",
    "Microsoft Security, Compliance, and Identity Fundamentals",
    "Scrum Developer I for PSD I",
    "Scrum Master I for PSM I",
    "Scrum Master II for PSM II",
    "Scrum Product Owner I for PSPO I",
  ];

  let index = 0;
  for (const link of await page.getByRole("main").getByRole("link").all()) {
    await expect(link.locator("h2")).toHaveText(examHeaders[index]);
    await expect(link.locator("p")).toHaveText(examParagraphs[index++]);
  }
});
