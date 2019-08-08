

Exercise.create(
  name: 'bench press',
  chest: true,
  )

Exercise.create(
  name: 'back squat',
  legs: true,
)

Rep.create(
  amount: '12-20',
  pace: '3-2-1'
)
Rep.create(
  amount: '1-5',
  pace: '1-1'
)
  
  WorkOut.create(
    date: '7/30/19',
    workout_id: 100,
    exercise_id: 1,
    rep_id: 1,
  )
  WorkOut.create(
    date: '7/30/19',
    workout_id: 100,
    exercise_id: 2,
    rep_id: 1,
  )
  WorkOut.create(
    date: '7/30/19',
    workout_id: 100,
    exercise_id: 2,
    rep_id: 2,
  )