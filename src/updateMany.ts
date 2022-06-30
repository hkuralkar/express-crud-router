import { RequestHandler, Request, Response } from 'express'


export type UpdateMany<R> = (conf: {
    filter: Record<string, any>
  },data: R, opts?: {
    req: Request
    res: Response
  }) => Promise<any>





export const updateMany = <R>(updateMany: UpdateMany<R>): RequestHandler => async (
req,
res,
next
) => {


    try {

    const {filter } = parseQuery(req.query )

    if (filter === {}) {
        return res.status(400).json({
        error: 'Can not update all records',
        })
    }
    await updateMany({filter},req.body, { req, res })
        res.json({ filter })
    } catch (error) {
        next(error)
    }

}



export const parseQuery = (query: any) => {
    const { filter } = query
  
    const { filters } = JSON.parse(filter || '{}')
  
    return {
      filter: filters,
    }
  }