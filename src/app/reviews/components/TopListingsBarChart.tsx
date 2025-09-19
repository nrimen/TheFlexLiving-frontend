"use client";

import { Review } from "../types/reviews";
import { computeTopListings } from "../utils/reviewAnalytics";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Props {
  reviews: Review[];
}

export default function TopListingsBarChart({ reviews }: Props) {
  const topListings = computeTopListings(reviews).slice(0, 10);

  const data = {
    labels: topListings.map(l => l.listing),
    datasets: [
      {
        label: "Avg Rating",
        data: topListings.map(l => l.avgRating),
        backgroundColor: "#284e4c",
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Top Listings by Avg Rating",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
