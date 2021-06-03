<template>
  <div id="main">
    <div class="row">
      <div class="content-wrapper-before"></div>
      <div class="col s12 mt-65">
        <div class="container">
          <!-- Current balance & total transactions cards-->
          <div class="row mt-4">
            <div class="col s12 m12 l4">
              <!-- Current Balance -->
              <div class="card animated  fadeInLeft ">
                <div class="card-content">
                  <h4 class="card-title mb-0">
                    {{ $t("bestseller") }}
                    <i class="material-icons float-right">more_vert</i>
                  </h4>
                  <p class="medium-small">{{ $t("bestseller_month") }}</p>
                  <canvas id="bestseller-chart" />
                </div>
              </div>
            </div>
            <div class="col s12 m12 l8 animated  fadeInRight">
              <!-- Total Transaction -->
              <div class="card">
                <div class="card-content">
                  <h4 class="card-title mb-0">
                    {{ $t("revenue") }}
                    <i class="material-icons float-right">more_vert</i>
                  </h4>
                  <p class="medium-small">{{ $t("revenue_month") }}</p>
                  <canvas id="revenue-chart" />
                </div>
              </div>
            </div>
            <!-- <div class="col s12 animated  fadeInRight" v-if="!branch">
             
              <div class="card">
                <div class="card-content">
                  <h4 class="card-title mb-0">
                    {{ $t("profit") }}
                    <i class="material-icons float-right">more_vert</i>
                  </h4>
                  <p class="medium-small">{{ $t("profit_month") }}</p>
                  <canvas id="profit-chart" />
                </div>
              </div>
            </div> -->

            <div class="col s12 m8 l8 animated  fadeInLeft" v-if="!branch">
              <div class="card">
                <div class="card-content">
                  <h4 class="card-title mb-0">
                    {{ $t("expenses") }}
                    <i class="material-icons float-right">more_vert</i>
                  </h4>
                  <p class="medium-small">{{ $t("expenses_month") }}</p>
                  <canvas id="expenses-chart" />
                </div>
              </div>
            </div>
            <div class="col s12 m4 l4" v-if="!branch">
              <div class="card animated  fadeInRight">
                <div class="card-content">
                  <h4 class="card-title mb-0">
                    {{ $t("revenue_branch") }}
                    <i class="material-icons float-right">more_vert</i>
                  </h4>
                  <p class="medium-small">{{ $t("revenue_branch_month") }}</p>
                  <canvas id="branches-chart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bestsellerChartData from "@/charts/bestseller-chart-data.js";
import revenueChartData from "@/charts/revenue-chart-data.js";
import profitChartData from "@/charts/profit-chart-data.js";
import expensesChartData from "@/charts/expenses-chart-data.js";
import branchesChartData from "@/charts/branches-chart-data.js";
import Chart from "chart.js";
import axios from "axios";
import { allBranches } from "@/graphql/queries/queries.js";
import { setTimeout } from "timers";

export default {
  name: "dashboard",
  apollo: {
    allBranches() {
      return {
        query: allBranches
      };
    }
  },
  store: {
    branch: "branch_id",
    isPos: "isPos"
  },
  data() {
    return {
      bestsellerData: {
        type: "polarArea",
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 0.92
        }
      },
      expensesData: {
        type: "line",
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          lineTension: 1
        }
      },
      revenueData: {
        type: "line",
        data: {
          labels: [],
          datasets: []
        },
        options: {
          responsive: true,
          lineTension: 1
        }
      },
      allBranches: [],
      bestsellerChartData,
      revenueChartData,
      profitChartData,
      expensesChartData,
      branchesChartData
    };
  },
  //mixins:[meMixin],
  mounted() {
    this.getRevenueData();
    this.getBestsellerData();
    this.getExpensesData();
    setTimeout(() => {
      this.createChart("bestseller-chart", this.bestsellerData);
      this.createChart("revenue-chart", this.revenueData);
      this.createChart("profit-chart", this.profitChartData);
      this.createChart("branches-chart", this.branchesChartData);
    }, 5000);
  },

  methods: {
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    },
    getRevenueData() {
      if (this.isPos == false) {
        axios
          .get("http://35.242.186.11/readerscorner/api_bookstore_system/public/chart", {}, {})
          .then(response => {
            let data = response.data;
            let datasets = [];
            let labels = [];
            data.forEach(d => {
              labels.push(`${d.month}/${d.day}`);
              datasets.push(parseInt(d.total));
            });
            this.revenueData.data.labels = labels;
            this.revenueData.data.datasets = [
              {
                // one line graph
                label: "Sales",
                backgroundColor: "rgba(249, 86, 129, .8)",
                data: datasets
              }
            ];
          });
        setTimeout(() => {
          this.allBranches.forEach(branch => {
            axios
              .get(
                `http://35.242.186.11/readerscorner/api_bookstore_system/public/chart/${branch.id}`,
                {},
                {}
              )
              .then(response => {
                let data = response.data;
                let datasets = [];
                let labels = [];
                data.forEach(d => {
                  labels.push(`${d.month}`);
                  datasets.push(parseInt(d.total));
                });
                this.revenueData.data.datasets.push({
                  // one line graph
                  label: branch.name,
                  backgroundColor: "rgba(5, 169, 244 , .8)",
                  data: datasets
                });
              });
          });
        }, 3000);
      } else {
        axios
          .get(
            `http://35.242.186.11/readerscorner/api_bookstore_system/public/chart/${this.branch}`,
            {},
            {}
          )
          .then(response => {
            let data = response.data;
            let datasets = [];
            let labels = [];
            data.forEach(d => {
              labels.push(`${d.month}`);
              datasets.push(parseInt(d.total));
            });

            this.revenueData.data.datasets.push({
              // one line graph
              label: "point 90",
              backgroundColor: "rgba(5, 169, 244 , .8)",
              data: datasets
            });
          });
      }
    },
    getBranchRevenueData(branch) {
      axios
        .get(`http://35.242.186.11/readerscorner/api_bookstore_system/public/chart/${branch.id}`, {}, {})
        .then(response => {
          let data = response.data;
          let datasets = [];
          let labels = [];
          data.forEach(d => {
            labels.push(`${d.month}`);
            datasets.push(parseInt(d.total));
          });

          this.revenueData.data.datasets.push({
            // one line graph
            label: branch.name,
            backgroundColor: "rgba(5, 169, 244 , .8)",
            data: datasets
          });
        });
    },
    getBestsellerData() {
      axios
        .get("http://35.242.186.11/readerscorner/api_bookstore_system/public/bestseller", {}, {})
        .then(response => {
          let data = response.data;
          let datasets = [
            {
              // one line graph
              label: "Total Sales",
              backgroundColor: [
                "rgba(5, 169, 244 , .8)",
                "rgba(249, 86, 129, .8)",
                "rgba(159, 93, 176 , .8)"
              ],
              data: []
            }
          ];
          let labels = [];
          data.forEach(d => {
            labels.push(`${d.name}`);
            datasets[0].data.push(parseInt(d.qty));
          });

          this.bestsellerData.data.labels = labels;
          this.bestsellerData.data.datasets = datasets;
        });
    },
    getExpensesData() {
      axios
        .get("http://35.242.186.11/readerscorner/api_bookstore_system/public/expenses", {}, {})
        .then(response => {
          let data = response.data;
          let datasets = [
            {
              // one line graph
              label: "Total Expenses",
              backgroundColor: ["rgb(56, 84, 165, .8)"],
              data: []
            }
          ];
          let labels = [];
          data.forEach(d => {
            labels.push(`${d.month}`);
            datasets[0].data.push(parseInt(d.value));
          });
          this.expensesData.data.labels = labels;
          this.expensesData.data.datasets = datasets;

          this.createChart("expenses-chart", this.expensesData);
        });
    }
  }
};
</script>
<style>
@import url("../sass/views/_dashboard.min.css");
</style>
