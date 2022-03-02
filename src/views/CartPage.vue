<template>
  <div class="personal-content">
    <div class="cart-content">
      <v-simple-table dense class="cart-content__table">
        <template v-slot:default>
          <tbody>
            <tr
              v-for="item in desserts"
              :key="item.name"
            >
              <td class="table-item">
                <img class="table-item__icon" src="~@/assets/img/mock/Item1.png" >
              </td>
              <td class="table-item">{{ item.name }}</td>
              <td class="table-item">
                <div class="table-item__buttons">
                  <v-icon>mdi-minus</v-icon>
                  <span class="table-item__count">0</span>
                  <v-icon>mdi-plus</v-icon>
                </div>
              </td>
              <td class="table-item">{{ item.calories }}$</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-card class="d-f pa-5 cart-content__order ">
        <v-card-title class="d-flex justify-space-between mt-0 mb-5 pa-0 align-baseline">
          <div class="order-title__text d-flex text-h5 pa-0">Total</div>
          <p class="order-title__text d-flex text-h4 text--primary ma-0">450$</p>
        </v-card-title>
        <v-card-text class="d-flex justify-space-between pa-0">
          <p>Товары, 1шт</p>
          <p>700р</p>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between pa-0">
          <p>Скидка</p>
          <p>-150р</p>
        </v-card-text>
        <v-card-text class="d-flex justify-space-between pa-0">
          <p>Доставка</p>
          <p>Бесплатно</p>
        </v-card-text>
        <v-card-text class="d-flex justify-start px-0">
          <p>Дата:</p>
          <p class="mx-2">4-6 Марта</p>
          <p>(Через 5 дней)</p>
        </v-card-text>
        <v-card-text class="d-flex justify-start px-0 py-1">
          <p>Оплата:</p>
          <p class="mx-2">Картой</p>
        </v-card-text>
        <v-item-group class="mt-3">
          <v-btn
          color="warning"
          dark
        >
          Order
        </v-btn>
        <v-btn
          class="ml-3"
          color="accent"
          dark
        >
          Appy coupon
        </v-btn>
        </v-item-group>
        <v-card-actions>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich with olives and breadcrumbs',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    }
})
</script>>

<style>

.cart-content {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.cart-content__table {
  width: 70%;
}

.table-item__icon {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.table-item__buttons {
  font-size: 1.2em;
  width: 165px;
}

.table-item__button {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0 15px;
  background-color: transparent;
  transition: 0.2s all ease;
}

.table-item__button::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  border: 1px solid gray;
  border-radius: 50%;
  z-index: 0;
}

.table-item__button:hover {
  transform: scale(1.1);
}

.table-item__button:active {
  transform: scale(1.2);
}

.cart-content__order {
  position: sticky;
  top: 20px;
  width: 30%;
  margin-left: 15px;
  height: auto;
}
</style>
