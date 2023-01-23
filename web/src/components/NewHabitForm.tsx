import { Check } from "phosphor-react"
import * as Checkbox from '@radix-ui/react-checkbox'
import {FormEvent, useState} from 'react'
import { api } from "../lib/axios"
export function NewHabitForm(){

    const [tittle, setTittle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    const availableWeekDays=[
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sabádo',
    ]

        async function createNewHabit(event: FormEvent){
            event.preventDefault()

            if(!tittle || weekDays.length === 0 ){
                return
            }
            await api.post('habits',{
                tittle,
                weekDays,
            })
            setTittle('')
            setWeekDays([])
            alert('Hábito criado com sucesso!')
        }

        function handleToggleWeekDay(weekDay: number) {
            if(weekDays.includes(weekDay)){
                const weekDaysWithRemoveOne = weekDays.filter(day => day != weekDay)

                setWeekDays(weekDaysWithRemoveOne)
            }else{
                const weekDaysWithAddedOne = [...weekDays, weekDay]
                setWeekDays(weekDaysWithAddedOne)
            }
        }

    return(
        <form onSubmit={createNewHabit} className="w=full flex flex-col mt-6">
            <label htmlFor="tittle" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input type="text"
            id='tittle'
            placeholder="ex.:Exercícios, dormir bem, etc..."
            className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
            autoFocus
            onChange={event => setTittle(event.target.value)}
            value={tittle}
            >
            </input>

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
              </label>


            <div className="flex flex-col gap-2 mt-3">
            {availableWeekDays.map((weekDay, index)=>{
                return(
                    <Checkbox.Root
                    key={weekDay}
                    className='flex items-center  gap-3 group focus:outline-none'
                    checked={weekDays.includes(index)}
                    onCheckedChange={()=>{
                        handleToggleWeekDay(index)
                    }}
                    >

            <div className='transition-colors h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800  group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background' >
            <Checkbox.Indicator>
            <Check size={20} className='text-white'></Check>
            </Checkbox.Indicator>
            </div>

            <span className=' text-white leading-tight'>
            {weekDay}
            </span>
            </Checkbox.Root>
                )
            })}


            </div>
            <button type="submit"
             className="transition-colors mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 group-focus:ring-offset-2 group-focus:ring-offset-background">
                <Check size={20} weight='bold' />
                Confirmar
            </button>
        </form>
    )
}