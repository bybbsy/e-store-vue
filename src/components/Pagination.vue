<template>
  <nav class="pagination-wrapper">
    <ul class="pagination__list">
      <li class="pagination__item">
        <button class="pagination__link pagination__link_button"
          @click="handlePageNumberClick('previous')"
          :class="{ 'pagination__link_disabled': !(page > 1) }"
        >
          <font-awesome-icon icon="fa-solid fa-circle-arrow-left" />
        </button>
      </li>

      <li v-for="(pageNumber, index) in pagesToShow" :key="index" class="pagination__item">
        <button class="pagination__link"
          @click="handlePageNumberClick(pageNumber)"
          :class="{ 'pagination__link_active': page === pageNumber }"
        >
          {{ pageNumber }}
        </button>
      </li>

      <li class="pagination__item">
        <button class="pagination__link pagination__link_button"
          @click="handlePageNumberClick('next')"
          :class="{ 'pagination__link_disabled': !(page < pages.length) }"
        >
          <font-awesome-icon icon="fa-solid fa-circle-arrow-right" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { PropType } from 'vue';

type pageButtons = 'previous' | 'next';

export default Vue.extend({
  name: 'pagination',
  props: {
    page: {
      type: Number,
      default: 1,
      required: true
    },
    pages: {
      type: Array as PropType<Array<number>>,
      default: [],
      required: true
    }
  },
  data() {
    return {
      maxPages: 7,
      filteredPages: [] as number[]
    }
  },
  computed: {
    pagesToShow(): number[] {
      if(this.page > this.maxPages) {
        const pagesToFinish = this.pages.length - this.page;
        const lastPageIndex = this.pages.length - 1;

        if(pagesToFinish <= this.maxPages) {
          return this.pages.slice(this.pages[lastPageIndex - this.maxPages] as number, this.pages[lastPageIndex] as number);
        }
      }
      return this.pages.slice(this.pages[this.page - 2] as number, this.pages[this.page + this.maxPages - 2] as number);
    },
  },
  methods: {
    handlePageNumberClick(page: number | pageButtons) {
      this.$emit('getPageNumber', page)
    }
  }
})

</script>
<style>

.pagination-wrapper {
  margin-top: 15px;
  padding-bottom: 15px;
}

.pagination__list {
  justify-content: center;
  align-items: center;
  display: flex;
}

.pagination__item {
  margin: 0 2px;
  font-size: 1.1em;
  color: var(--main-white);
}

.pagination__link {
  width: 25px;
  height: 25px;
  transition: 0.5s all ease;
}

.pagination__link:hover {
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.096);
  transition: 0.5s all ease;
}

.pagination__link.pagination__link_button {
  width: unset;
  height: unset;
  font-size: 1.5em;
  transition: 0.4s all ease;
  color: var(--main-orange)
}

.pagination__link_disabled {
  opacity: 0;
  pointer-events: none;
}

.pagination__link_active {
  opacity: 1;
  pointer-events: all;
  border-radius: 50%;
  background-color: var(--main-blue);
}

.pagination__link.pagination__link_button:hover {
  transform: scale(1.1);
  background-color: unset;
}
</style>
