              <span>Total AI response (ms)</span>
              <span className="text-[#34d399]">target &lt; 3500</span>
            </div>
            <LineChart color="#059669" targetY={50} />
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader title="Feature-level breakdown" />
        <Table
          head={["Feature", "Success", "Unique Users", "Total Tokens", "Cost ($)"]}
          rows={data.aiAnalysis.map((r) => [
            r.feature,
            r.success ? "✓ true" : "✗ false",
            r.uniques.toString(),
            r.tokens.toLocaleString(),
            r.cost.toFixed(5),
          ])}
          totals={["Overall", "", "7", totalTokens.toLocaleString(), totalCost.toFixed(3)]}
        />
      </Card>
    </div>
