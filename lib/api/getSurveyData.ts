import { SurveyTileProps } from '@/components/Tiles/Survey'
import getOne from '@/utils/ContentFactory'

export const getSurveyData = async (surveyID: number | string) => {
  try {
    const data = await getOne(surveyID.toString(), 'survey')

    const props: SurveyTileProps = {
      title: data?.title ?? '',
      answer: {
        text: data?.answer_text ?? '',
        percent: data?.answer_percent ?? 0,
      },
      question: data?.question ?? '',
      dataSource: data?.dataSource ?? '',
      dataRetrieval: data?.dataRetrieval ?? new Date(),
      id: data?.id ?? '',
    }
    return props
  } catch (e) {
    return undefined
  }
}
