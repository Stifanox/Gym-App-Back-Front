export interface TrainingDay{
    trainingDay:number
    exerciseId:number
    weight:number,
    sets:number,
    reps:number
    trainingCycleId:number
}

export interface TrainingDayWithId extends TrainingDay{
    id:number
}