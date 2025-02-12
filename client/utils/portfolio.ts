"use server";
import { cookies } from "next/headers";

interface Portfolio {
  id: string;
  portfolioName: string;
  description: string;
  created: string;
}

interface CreatePortfolioDto {
  portfolioName: string;
  description: string;
}

const apiURL = process.env.NEXT_PUBLIC_DEV_API;

export const getPortfolios = async (): Promise<Portfolio[]> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(".AspNetCore.Identity.Application")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiURL}/api/portfolios`, {
    headers: {
      Cookie: `.AspNetCore.Identity.Application=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch portfolios: ${response.statusText}`);
  }

  return response.json();
};

export const createPortfolio = async (
  data: CreatePortfolioDto
): Promise<Portfolio> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(".AspNetCore.Identity.Application")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiURL}/api/portfolio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `.AspNetCore.Identity.Application=${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create portfolio: ${response.statusText}`);
  }

  return response.json();
};

export const updatePortfolio = async (
  id: string,
  data: CreatePortfolioDto
): Promise<Portfolio> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(".AspNetCore.Identity.Application")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiURL}/api/portfolio/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `.AspNetCore.Identity.Application=${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update portfolio: ${response.statusText}`);
  }

  return response.json();
};

export const deletePortfolio = async (id: string): Promise<void> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(".AspNetCore.Identity.Application")?.value;

  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${apiURL}/api/portfolio/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: `.AspNetCore.Identity.Application=${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete portfolio: ${response.statusText}`);
  }
};

export type { Portfolio, CreatePortfolioDto };
