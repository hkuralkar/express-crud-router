import { RequestHandler, Request, Response } from 'express'

export type DestroyMany = (conf: {
    filter: Record<string, any>
  }, opts?: {
    req: Request
    res: Response
  }) => Promise<any>



export const destroyMany = (destroyMany: DestroyMany): RequestHandler => async (
req,
res,
next
) => {


    try {

    const {filter } = parseQuery(req.query )

    if (filter === {}) {
      return res.status(400).json({
        error: 'Can not delete all records',
      })
    }
    await destroyMany({filter}, { req, res })
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