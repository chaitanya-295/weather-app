import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TemperatureChart = ({ forecast }) => {

  if (!forecast) return null;

  // 🔥 Take next 8 (24 hours)
  const data = forecast.list.slice(0, 8).map((item) => {
    const date = new Date(item.dt * 1000);

    return {
      time: date.getHours() + ":00",
      temp: Math.round(item.main.temp),
    };
  });

  return (
    <div className="glass p-5">

      <h3 className="text-gray-600 dark:text-gray-300 text-sm mb-4">
        Temperature (24h)
      </h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          
          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            fontSize={12}
          />

          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.8)",
              border: "none",
              borderRadius: "10px",
            }}
          />

          <Line
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default TemperatureChart;