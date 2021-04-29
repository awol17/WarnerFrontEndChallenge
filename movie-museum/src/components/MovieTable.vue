<template>
  <div class="card">
    <div class="card-title" v-if="title">{{ title }}</div>
    <div>
      <table class="table" width="100%">
        <thead class="table-head">
          <tr>
            <th
              v-for="(col, index) in columns"
              :key="index"
              :style="{ width: col.width ? col.width : 'auto' }"
            >
              <div @click="col.sortable ? doSort(col.value) : false">
                {{ col.name }}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in movieCache" :key="i">
            <td v-for="(col, j) in columns" :key="j">
              <div v-if="col.render" v-html="col.render(row)"></div>
              <div v-else-if="col.editable">
                <input type="text" v-model="row[col.value]" />
              </div>
              <div v-else-if="col.button == 'Favorite'">
                <input
                  type="checkbox"
                  class="checkbox"
                  :checked="row.favorite"
                  @click="updateFavorites(row.id)"
                />
              </div>
              <div v-else-if="col.button == 'Delete'">
                <button type="button" class="btn" @click="deleteRow(row.id)">Delete</button>
              </div>
              <span v-else>{{ row[col.value] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

export default {
  name: "MovieTable",
  props: {
    title: {
      type: String,
      default: "",
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    rows: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      currentSortCol: "",
      sortOrder: "asc",
      movieCache: [],
    };
  },
  methods: {
    doSort(key) {
      if (key === this.$data.currentSortCol) {
        this.$data.sortOrder = this.$data.sortOrder === "asc" ? "desc" : "asc";
      }
      this.$data.currentSortCol = key;

      const self = this;
      this.$data.movieCache.sort(function (a, b) {
        let mod = 1;
        if (self.$data.sortOrder === "desc") {
          mod = -1;
        }

        if (a[self.$data.currentSortCol] < b[self.$data.currentSortCol]) {
          return -1 * mod;
        }

        if (a[self.$data.currentSortCol] > b[self.$data.currentSortCol]) {
          return 1 * mod;
        }
      });
    },
    deleteRow(id) {
      const index = this.$data.movieCache.findIndex((row) => row.id == id);

      this.$data.movieCache.splice(index, 1);
    },
    updateFavorites(id) {
      const index = this.$data.movieCache.findIndex((row) => row.id == id);

      this.$data.movieCache[index].favorite =
        this.$data.movieCache[index].favorite === true ? false : true;
      this.$emit("moviesChanged", this.$data.movieCache);
    },
  },
  watch: {
    rows() {
      this.$data.movieCache = cloneDeep(this.rows || []);
    },
    movieCache: {
      handler: function (val) {
        this.$emit("moviesChanged", val);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  padding: 20px;
}

.card-title {
  font-size: 32px;
}

table 			      { 
  border-spacing: 1; 
  border-collapse: collapse; 
  background:white;
  border-radius:6px;
  overflow:hidden;
  max-width:800px; 
  width:100%;
  margin:0 auto;
  position:relative;
  color: #212529;
  border: 1px solid #dee2e6;
}

th {
  text-align: inherit;
}

tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.table .table-head th {
  color: #fff;
  background-color: #343a40;
  border-color: #454d55;
  vertical-align: middle;
  border-bottom: 2px solid #dee2e6;
}

.table thead td,
.table thead th {
  border-bottom-width: 2px;
  border: 1px solid #dee2e6;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.table tr:nth-child(odd) {
  background-color: rgb(240, 255, 255);
}

.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.btn {
  letter-spacing: 1px;
  font-weight: 700;
  color: #fff;
  background: #226fbe;
  border: 4px solid #226fbe;
  border-radius: 4px;
}

.checkbox {
  background: #226fbe;
}

</style>
