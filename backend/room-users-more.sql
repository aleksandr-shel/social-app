--select *
--from dbo.Messages m
--join dbo.Rooms r
--on m.RoomId = r.Id
--group by r.Id
--having m.Date = MAX(m.Date)
--order by m.Date


--select m.Id
--from dbo.Messages m
--group by m.RoomId
--having max(m.Date) = m.Date

select *
from dbo.Messages m
where m.Date = (select max(m2.Date)
				from dbo.Messages m2
				where m.RoomId = m2.RoomId)