import { rowHeight, minHour, maxHour } from "@/config/turnConfig";
import { getHour } from "@/utils/dateUtils";

const getTop = (startTime) => {
  const [h, m] = startTime.split(":");
  return Math.round(
    (parseInt(h, 10) + parseInt(m, 10) / 60 - minHour) * rowHeight
  );
};

const getPosition = (turn) => {
  const { startTime, duration, id } = turn;

  const top = getTop(startTime);

  const height = (parseInt(duration, 10) / 60) * rowHeight;

  return {
    id,
    A: top,
    B: top + height,
    style: { top, height },
  };
};

export const getTopCurrentHour = () => {
  const hour = getHour();
  const h = parseInt(hour.split(":")[0], 10);
  if (h > maxHour) {
    return -1;
  }

  return getTop(hour);
};

export const formatTurns = (dataList) => {
  if (!dataList || !dataList.length) {
    return [];
  }
  const orderedData = dataList
    .sort((a, b) => {
      return a.startTime > b.startTime ? 1 : -1;
    })
    .map((turn) => {
      return {
        ...turn,
        position: {
          ...getPosition(turn),
          column: 0,
          quantity: 1,
        },
      };
    });

  const list = [{ ...orderedData[0] }];

  for (let i = 1; i < orderedData.length; i++) {
    const currentTurn = { ...orderedData[i] };

    for (let j = list.length - 1; j >= 0; j--) {
      if (
        currentTurn.position.A >= list[j].position.A &&
        currentTurn.position.A < list[j].position.B
      ) {
        const nextColumn = list[j].position.column + 1;
        if (nextColumn > currentTurn.position.column) {
          currentTurn.position.column = nextColumn;
        }
      }
      if (list[j].position.column === 0) {
        break;
      }
    }
    list.push(currentTurn);
  }

  let k = 0;

  for (let j = list.length - 1; j >= 0; j--) {
    if (list[j].position.column > k) {
      k = list[j].position.column;
    }

    list[j].position.quantity = k + 1;

    if (list[j].position.column === 0) {
      k = 0;
    }
  }

  return list;
};
