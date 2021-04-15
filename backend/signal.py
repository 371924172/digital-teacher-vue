class signal:
    def __init__(self, name="", wave="",period = None,phase = None):
        self.name = name
        self.wave = wave
        self.period = period
        self.phase = phase


    def to_dict(self):
        if self.period and self.phase:
            return {
                "name" :self.name,
                "wave" :self.wave,
                "period":self.period,
                "phase" :self.phase
            }
        elif self.period:
            return {
                "name": self.name,
                "wave": self.wave,
                "period": self.period
            }
        elif self.phase:
            return{
                "name": self.name,
                "wave": self.wave,
                "phase": self.phase
            }
        else:
            return {
                "name": self.name,
                "wave": self.wave
            }