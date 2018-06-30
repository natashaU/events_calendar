const EVENT = 'event';

class MockEvents {
  constructor(startDate) {
    const mockStart1 = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 28,
      8,
    );
    const mockEnd1 = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 25,
      9,
    );
    const mockStart2 = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 23,
      8,
    );
    const mockEnd2 = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 20,
      9,
    );
    const mockStart3 = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 18,
      12,
    );
    const mockEnd3 = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() - 17,
      13,
    );
    return [
      {
        kind: EVENT,
        description: 'Meeting',
        eventStart: mockStart1,
        eventEnd: mockEnd1,
      },
      {
        kind: EVENT,
        description: 'Phone Call',
        eventStart: mockStart2,
        eventEnd: mockEnd2,
      },
      {
        kind: EVENT,
        description: 'Lunch',
        eventStart: mockStart3,
        eventEnd: mockEnd3,
      },
    ];
  }
}

export default MockEvents;
