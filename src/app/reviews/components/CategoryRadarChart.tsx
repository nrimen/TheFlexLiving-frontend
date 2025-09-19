"use client";

import { Review } from "../types/reviews";
import { computeCategoryAverages } from "../utils/reviewAnalytics";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  reviews: Review[];
}

export default function CategoryRadarChart({ reviews }: Props) {
  const categories = computeCategoryAverages(reviews);

  const data = {
    labels: categories.map(c => c.category.replace("_", " ")),
    datasets: [
      {
        label: "Avg Rating",
        data: categories.map(c => c.avgRating),
        backgroundColor: "rgba(40,78,76,0.2)",
        borderColor: "#284e4c",
        borderWidth: 2,
        pointBackgroundColor: "#284e4c",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Category Ratings Overview",
      },
    },
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return <Radar data={data} options={options} />;
}
