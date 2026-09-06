import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function CrowdChart({ data = [] }) {
  return (
    <div className="relative h-[320px] w-full">
      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-soft)]">
          <p className="text-sm text-[var(--text-muted)]">
            Crowd trend data unavailable.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="crowdGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--accent)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--accent)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="4 6"
              vertical={false}
            />

            <XAxis
              dataKey="time"
              tick={{
                fill: "var(--text-muted)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: "var(--text-muted)",
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "var(--surface-solid)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                boxShadow: "var(--shadow-md)",
                color: "var(--text-primary)",
              }}
              labelStyle={{
                color: "var(--text-secondary)",
                marginBottom: "4px",
              }}
              formatter={(value) => [`${Math.round(value)}`, "Crowd score"]}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="var(--accent)"
              strokeWidth={3}
              fill="url(#crowdGradient)"
              fillOpacity={1}
              activeDot={{
                r: 7,
                strokeWidth: 3,
                stroke: "var(--surface-solid)",
                fill: "var(--accent)",
              }}
              animationDuration={1400}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CrowdChart;