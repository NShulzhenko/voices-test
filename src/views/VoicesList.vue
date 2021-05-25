<template>
  <div class="voice-list-container">
    <div class="header">
      <div class="search-input">
        <img :src="`${publicPath}search.svg`" alt="" />
        <input v-model="searchInput" />
      </div>

      <div class="header-right">
        <div class="header-select">
          <img :src="`${publicPath}filter.svg`" alt="" />
          <select @change="filterVoices">
            <option
              v-for="(item, index) in tags"
              :key="index"
              :value="item.value"
            >
              {{ item.text }}
            </option>
          </select>
        </div>

        <div class="header-select">
          <img :src="`${publicPath}order.svg`" alt="" />
          <select @change="sortVoices">
            <option
              v-for="(item, index) in sortValues"
              :key="index"
              :value="item.value"
            >
              {{ item.text }}
            </option>
          </select>
        </div>

        <img
          :src="`${publicPath}button-random.svg`"
          alt=""
          class="random-icon"
          @click="selectRandomItem"
          v-scroll
        />
      </div>
    </div>

    <div class="content-container">
      <div class="section-title">
        <span class="section-title-text">FAVOURITE VOICES</span>
        <hr />
      </div>
      <div class="voice-favourites-list">
        <template v-if="favouriteVoices.length">
          <div
            v-for="item in favouriteVoices"
            :key="item.id"
            class="voice-item"
            :class="{ selected: selectedId === item.id }"
            @click="setItemChosen(item.id)"
          >
            <img
              :src="`${publicPath}${item.icon}`"
              height="110"
              width="110"
              class="voice-icon"
            />
            <p v-text="item.name" />
            <img
              class="favourite-icon"
              :src="`${publicPath}voice-favourite.svg`"
              alt=""
              @click="removeFavouriteId(item.id)"
            />
          </div>
        </template>
        <div v-else class="no-favourite">
          <span>No favourites</span>
        </div>
      </div>

      <div class="section-title">
        <span class="section-title-text">PRO VOICES</span>
        <hr />
      </div>
      <div class="voice-list">
        <div
          v-for="item in filteredVoices"
          :key="item.id"
          class="voice-item"
          :class="{ selected: selectedId === item.id }"
          @click="setItemChosen(item.id)"
        >
          <img
            :src="`${publicPath}${item.icon}`"
            height="110"
            width="110"
            class="voice-icon"
          />
          <p v-text="item.name" />
          <span class="favourite-icon">
            <img
              v-if="isFavourite(item.id)"
              :src="`${publicPath}voice-favourite.svg`"
              alt=""
              @click="removeFavouriteId(item.id)"
            />
            <img
              v-else
              :src="`${publicPath}voice-favourite-off.svg`"
              alt=""
              @click="addFavouriteId(item.id)"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import scrollToElement from "../directives/scrollToElement";

export default {
  name: "VoicesList",

  directives: {
    scroll: scrollToElement,
  },

  computed: {
    voices() {
      return this.$store.state.items;
    },

    tags() {
      return this.$store.state.tags;
    },

    favouriteIds() {
      return this.$store.state.favouriteIds;
    },

    filteredVoices() {
      let result = this.voices;
      if (this.searchInput.length) {
        result = result.filter(item =>
          item.name.toLowerCase().includes(this.searchInput.toLowerCase())
        );
      }
      if (this.filterCategory.length) {
        result = result.filter(item => item.tags.includes(this.filterCategory));
      }
      return result.sort((a, b) => {
        if (a.name < b.name) {
          return -this.sort;
        }
        if (a.name > b.name) {
          return this.sort;
        }
        return 0;
      });
    },

    favouriteVoices() {
      return this.filteredVoices.filter(item =>
        this.favouriteIds.includes(item.id)
      );
    }
  },

  data() {
    return {
      searchInput: "",
      filterCategory: "",
      publicPath: process.env.BASE_URL,
      sortValues: [
        {
          text: "Ascending",
          value: 1
        },
        {
          text: "Descending",
          value: -1
        }
      ],
      sort: true,
      selectedId: null,
    };
  },

  created() {
    this.fetchVoices();
  },

  methods: {
    ...mapActions(["fetchVoices"]),

    ...mapMutations(["addFavouriteId", "removeFavouriteId"]),

    isFavourite(id) {
      return this.favouriteIds.includes(id);
    },

    filterVoices(event) {
      const { value } = event.target;
      this.filterCategory = value;
    },

    sortVoices(event) {
      const { value } = event.target;
      this.sort = value;
    },

    selectRandomItem() {
      const ids = this.filteredVoices.map(item => item.id);
      this.selectedId = ids[Math.floor(Math.random() * ids.length)];
    },

    setItemChosen(id) {
      this.selectedId = id;
    },
  }
};
</script>

<style lang="scss" scoped>
$silver: #d2d2d2;
$main-black: #000000;
$background-black: #1b1b1b;
$silver-main: #858585;

.voice-list-container {
  padding: 20px;
  margin: 0 auto;
  max-width: 1100px;

  .header {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .header-right {
    display: flex;
    flex-wrap: wrap;
  }

  .content-container {
    padding: 0 20px;

  }

  .header-select {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    select {
      width: 130px;
      padding: 5px;
      font-size: 16px;
      line-height: 1;
      border: 0;
      border-radius: 5px;
      height: 34px;
      background: url("/select-arrow.svg") no-repeat right;
      -webkit-appearance: none;
      background-position-x: 100px;
      background-color: $main-black;
      color: $silver;
      margin-left: 5px;
      outline: none;
      cursor: pointer;
    }
    &:not(:first-child) {
      margin-left: 25px;
    }
  }

  .random-icon {
    cursor: pointer;
    margin-left: 15px;
    margin-bottom: 15px;
  }

  .section-title {
    display: flex;
    align-items: center;
    margin: 20px 0;

    .section-title-text {
      margin-right: 15px;
      white-space: nowrap;
    }

    hr {
      width: 100%;
      opacity: 0.2;
    }
  }

  .search-input {
    width: 230px;
    border-radius: 20px;
    display: flex;
    background: $main-black;
    margin-bottom: 15px;

    input {
      background: $main-black;
      outline: none;
      color: $silver;
      border: none;
    }
  }

  .voice-favourites-list {
    display: flex;
    flex-wrap: wrap;
  }
  .voice-list {
    display: flex;
    flex-wrap: wrap;
  }
  .voice-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $silver;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
    width: 120px;
    text-align: center;
    margin-bottom: 15px;
    margin-right: 50px;

    &.selected {
      .voice-icon {
        background-color: #ffc107;
        box-shadow: 0 0 8px 9px rgba(255, 255, 255, 0.2);
      }
    }

    .voice-icon {
      background: $silver;
      border-radius: 50%;
      margin-bottom: 10px;
    }

    .favourite-icon {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
    }

    &:hover .favourite-icon {
      display: block;
    }
  }

  .no-favourite {
    padding: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}


@media (max-width: 468px) {
  .voice-list-container {
    .header-select {
      &:not(:first-child) {
        margin-left: 0;
      }
    }
  }
}
</style>
